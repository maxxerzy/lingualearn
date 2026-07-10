// Kapselt lightweight-charts v5: Kerzen + Volumen, zuschaltbare Indikatoren
// (Overlays + RSI/MACD-Panes), Crosshair-Readout, log/linear, Preislinien
// für Alarme/Stop-Loss.

import {
  createChart, CandlestickSeries, HistogramSeries, LineSeries, LineStyle,
} from '../../vendor/lightweight-charts.standalone.production.mjs';
import { sma, ema, bollinger, rsi, macd, volumeBars } from '../core/indicators.js';

const OVERLAY_STYLES = {
  sma20: { color: '#f5a524', title: 'SMA 20' },
  sma50: { color: '#4c8dff', title: 'SMA 50' },
  sma200: { color: '#b085f5', title: 'SMA 200' },
  ema20: { color: '#2dd4bf', title: 'EMA 20' },
};

function chartTheme() {
  const styles = getComputedStyle(document.documentElement);
  const text = styles.getPropertyValue('--text-dim').trim() || '#8b98a5';
  const border = styles.getPropertyValue('--border').trim() || '#2a3441';
  return {
    autoSize: true,
    layout: {
      background: { color: 'transparent' },
      textColor: text,
      attributionLogo: false,
    },
    grid: {
      vertLines: { color: border + '55' },
      horzLines: { color: border + '55' },
    },
    crosshair: { mode: 0 },
    timeScale: { borderColor: border, timeVisible: true, secondsVisible: false },
    rightPriceScale: { borderColor: border },
    localization: {
      locale: 'de-DE',
      priceFormatter: (p) => new Intl.NumberFormat('de-DE', { maximumFractionDigits: p < 10 ? 3 : 2 }).format(p),
    },
  };
}

export class ChartController {
  constructor(container, { onCrosshair } = {}) {
    this.container = container;
    this.onCrosshair = onCrosshair;
    this.chart = createChart(container, chartTheme());
    this.candleSeries = this.chart.addSeries(CandlestickSeries, {
      upColor: '#30a46c', downColor: '#e5484d',
      wickUpColor: '#30a46c', wickDownColor: '#e5484d',
      borderVisible: false,
    });
    this.volumeSeries = null;
    this.overlays = new Map();     // name → series | {upper,middle,lower}
    this.panes = new Map();        // 'rsi' | 'macd' → [series...]
    this.priceLines = [];
    this.candles = [];
    this.active = new Set(['vol']);

    this.chart.subscribeCrosshairMove((param) => {
      if (!this.onCrosshair) return;
      const bar = param?.seriesData?.get(this.candleSeries);
      this.onCrosshair(bar && bar.open !== undefined ? bar : null);
    });
  }

  setCandles(candles, interval) {
    this.candles = candles;
    const intraday = ['1m', '2m', '5m', '15m', '30m', '60m', '90m', '1h'].includes(interval);
    this.chart.timeScale().applyOptions({ timeVisible: intraday });
    this.candleSeries.setData(candles.map((k) => ({
      time: k.t, open: k.o, high: k.h, low: k.l, close: k.c,
    })));
    this.refreshIndicators();
    this.chart.timeScale().fitContent();
  }

  toggleIndicator(name) {
    if (this.active.has(name)) this.active.delete(name);
    else this.active.add(name);
    this.refreshIndicators();
    return this.active.has(name);
  }

  isActive(name) {
    return this.active.has(name);
  }

  refreshIndicators() {
    const candles = this.candles;

    // --- Volumen (Overlay mit eigener, unten angedockter Skala) ---
    if (this.active.has('vol') && candles.length) {
      if (!this.volumeSeries) {
        this.volumeSeries = this.chart.addSeries(HistogramSeries, {
          priceFormat: { type: 'volume' },
          priceScaleId: 'vol',
          lastValueVisible: false,
          priceLineVisible: false,
        });
        this.chart.priceScale('vol').applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } });
      }
      this.volumeSeries.setData(volumeBars(candles));
    } else if (this.volumeSeries) {
      this.chart.removeSeries(this.volumeSeries);
      this.volumeSeries = null;
    }

    // --- Linien-Overlays ---
    const overlayData = {
      sma20: () => sma(candles, 20),
      sma50: () => sma(candles, 50),
      sma200: () => sma(candles, 200),
      ema20: () => ema(candles, 20),
    };
    for (const [name, dataFn] of Object.entries(overlayData)) {
      const wanted = this.active.has(name);
      const existing = this.overlays.get(name);
      if (wanted && candles.length) {
        let series = existing;
        if (!series) {
          series = this.chart.addSeries(LineSeries, {
            color: OVERLAY_STYLES[name].color, lineWidth: 1.6,
            lastValueVisible: false, priceLineVisible: false, crosshairMarkerVisible: false,
          });
          this.overlays.set(name, series);
        }
        series.setData(dataFn());
      } else if (!wanted && existing) {
        this.chart.removeSeries(existing);
        this.overlays.delete(name);
      }
    }

    // --- Bollinger (drei Linien) ---
    const bbExisting = this.overlays.get('bb');
    if (this.active.has('bb') && candles.length) {
      const bands = bollinger(candles, 20, 2);
      let trio = bbExisting;
      if (!trio) {
        const mk = (width, style) => this.chart.addSeries(LineSeries, {
          color: '#8b98a5', lineWidth: width, lineStyle: style,
          lastValueVisible: false, priceLineVisible: false, crosshairMarkerVisible: false,
        });
        trio = { upper: mk(1, LineStyle.Solid), middle: mk(1, LineStyle.Dotted), lower: mk(1, LineStyle.Solid) };
        this.overlays.set('bb', trio);
      }
      trio.upper.setData(bands.upper);
      trio.middle.setData(bands.middle);
      trio.lower.setData(bands.lower);
    } else if (bbExisting) {
      for (const s of Object.values(bbExisting)) this.chart.removeSeries(s);
      this.overlays.delete('bb');
    }

    // --- RSI-Pane ---
    this.syncPane('rsi', () => {
      const series = this.chart.addSeries(LineSeries, {
        color: '#b085f5', lineWidth: 1.6, lastValueVisible: true, priceLineVisible: false,
      }, 1);
      series.createPriceLine({ price: 70, color: '#e5484d88', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: false });
      series.createPriceLine({ price: 30, color: '#30a46c88', lineWidth: 1, lineStyle: LineStyle.Dashed, axisLabelVisible: false });
      return [series];
    }, ([series]) => series.setData(rsi(candles, 14)));

    // --- MACD-Pane ---
    this.syncPane('macd', () => {
      const paneIndex = this.panes.has('rsi') ? 2 : 1;
      const hist = this.chart.addSeries(HistogramSeries, {
        lastValueVisible: false, priceLineVisible: false,
      }, paneIndex);
      const macdLine = this.chart.addSeries(LineSeries, {
        color: '#4c8dff', lineWidth: 1.6, lastValueVisible: false, priceLineVisible: false,
      }, paneIndex);
      const signalLine = this.chart.addSeries(LineSeries, {
        color: '#f5a524', lineWidth: 1.2, lastValueVisible: false, priceLineVisible: false,
      }, paneIndex);
      return [hist, macdLine, signalLine];
    }, ([hist, macdLine, signalLine]) => {
      const m = macd(candles, 12, 26, 9);
      hist.setData(m.histogram);
      macdLine.setData(m.macd);
      signalLine.setData(m.signal);
    });
  }

  syncPane(name, createFn, fillFn) {
    const wanted = this.active.has(name);
    const existing = this.panes.get(name);
    if (wanted && this.candles.length) {
      let seriesList = existing;
      if (!seriesList) {
        seriesList = createFn();
        this.panes.set(name, seriesList);
      }
      fillFn(seriesList);
    } else if (!wanted && existing) {
      for (const s of existing) this.chart.removeSeries(s);
      this.panes.delete(name);
    }
  }

  setLogScale(on) {
    this.chart.priceScale('right').applyOptions({ mode: on ? 1 : 0 });
  }

  /** Alarm-/Stop-Loss-Linien: lines = [{price, color, title, dashed}] */
  setPriceLines(lines) {
    for (const line of this.priceLines) this.candleSeries.removePriceLine(line);
    this.priceLines = lines.map((l) =>
      this.candleSeries.createPriceLine({
        price: l.price,
        color: l.color,
        lineWidth: 1,
        lineStyle: l.dashed === false ? LineStyle.Solid : LineStyle.Dashed,
        axisLabelVisible: true,
        title: l.title || '',
      })
    );
  }

  destroy() {
    this.chart.remove();
  }
}
