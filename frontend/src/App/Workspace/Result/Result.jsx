import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useRef, useEffect, useState } from "react";

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
        legend: {
            labels: { color: "#9ca3af", font: { size: 11 } },
        },
        tooltip: {
            backgroundColor: "#1f2937",
            titleColor: "#d1d5db",
            bodyColor: "#9ca3af",
            borderColor: "#374151",
            borderWidth: 1,
            padding: 8,
            callbacks: {
                label: (ctx) => ` ${ctx.dataset.label}: ${Number(ctx.parsed.y).toFixed(4)}`,
            },
        },
    },
    scales: {
        x: {
            min: 0,
            max: 100,
            grid: { color: "rgba(255,255,255,0.05)" },
            ticks: { color: "#6b7280", maxTicksLimit: 11 },
            border: { display: false },
        },
        y: {
            grid: { color: "rgba(255,255,255,0.05)" },
            ticks: { color: "#6b7280" },
            border: { display: false },
        },
    },
    elements: {
        point: { radius: 0, hoverRadius: 4 },
        line: { tension: 0.4, borderWidth: 2 },
    },
};

function Result({ loading = false, result = null, error = null }) {
    const history = result?.history;
    const lastIndex = history ? history.epoch.length - 1 : -1;
    const containerRef = useRef(null);
    const [narrow, setNarrow] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            setNarrow(entry.contentRect.width < 480);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return (
        <div className="mt-4 flex-grow flex flex-col" ref={containerRef}>
            <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1">Training Results</h3>

            {/* Middle — grows to fill space */}
            <div style={{ flex: "1 1 0", minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {loading && <span className="text-sm text-gray-400" style={{ textAlign: "center" }}>Training {result?.model || "model"}; this can take a few minutes…</span>}
                {error   && <span className="result-error">{error}</span>}
                {!loading && !error && !result && <span className="text-sm text-gray-500" style={{ textAlign: "center" }}>Train a Basic or Advanced model to view results.</span>}

                {result && !loading && !error && (
                    <div style={{ display: "flex", flexDirection: narrow ? "column" : "row", gap: "0.75rem", flex: "1 1 0", minHeight: 0 }}>
                        <div style={{ flex: "1 1 0", minWidth: 0, minHeight: 0, position: "relative" }}>
                            <Line
                                options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: "Accuracy", color: "#d1d5db", font: { size: 12 } } } }}
                                data={{
                                    labels: result.history.epoch,
                                    datasets: [
                                        { label: "Train",      data: result.history.train_acc, borderColor: "#60a5fa", backgroundColor: "transparent" },
                                        { label: "Validation", data: result.history.eval_acc,  borderColor: "#a78bfa", backgroundColor: "transparent" },
                                    ],
                                }}
                            />
                        </div>
                        <div style={{ flex: "1 1 0", minWidth: 0, minHeight: 0, position: "relative" }}>
                            <Line
                                options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: "Loss", color: "#d1d5db", font: { size: 12 } } } }}
                                data={{
                                    labels: result.history.epoch,
                                    datasets: [
                                        { label: "Train",      data: result.history.train_loss, borderColor: "#34d399", backgroundColor: "transparent" },
                                        { label: "Validation", data: result.history.eval_loss,  borderColor: "#fbbf24", backgroundColor: "transparent" },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom — always pinned */}
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm" style={{ flexShrink: 0 }}>
                <div className="bg-gray-800 p-2 rounded border border-gray-700">
                    <span className="text-gray-400 text-xs uppercase">Train Accuracy</span>
                    <div className="font-semibold" style={{ color: "#60a5fa" }}>{result ? `${history.train_acc[lastIndex].toFixed(2)}%` : "--%"}</div>
                </div>
                <div className="bg-gray-800 p-2 rounded border border-gray-700">
                    <span className="text-gray-400 text-xs uppercase">Train Loss</span>
                    <div className="font-semibold" style={{ color: "#34d399" }}>{result ? history.train_loss[lastIndex].toFixed(4) : "--"}</div>
                </div>
                <div className="bg-gray-800 p-2 rounded border border-gray-700">
                    <span className="text-gray-400 text-xs uppercase">Test Accuracy</span>
                    <div className="font-semibold text-gray-100">{result ? `${result.test.accuracy.toFixed(2)}%` : "--%"}</div>
                </div>
                <div className="bg-gray-800 p-2 rounded border border-gray-700">
                    <span className="text-gray-400 text-xs uppercase">Test Loss</span>
                    <div className="font-semibold text-gray-100">{result ? result.test.loss.toFixed(4) : "--"}</div>
                </div>
            </div>
        </div>
    );
}

export default Result;
