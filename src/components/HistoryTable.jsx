import React from "react";

function formatDate(dateStr) {
  if (!dateStr) return "--";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTime(dateStr) {
  if (!dateStr) return "--";
  const date = new Date(dateStr);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function formatDateTime(s) {
  if (!s) return "--";
  return `${formatDate(s)} ${formatTime(s)}`;
}

export default function HistoryTable({ stops }) {
  const rows = [...stops].slice(-20).reverse();
  return (
    <table>
      <thead>
        <tr>
          <th>Máquina</th>
          <th>Motivo</th>
          <th>Início</th>
          <th>Fim</th>
          <th>Duração (min)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, idx) => (
          <tr key={r.id ?? idx}>
            <td>{r.machine || "—"}</td>
            <td>{r.reason || "—"}</td>
            <td>{formatDateTime(r.start_time || r.start || r.timestamp)}</td>
            <td>{r.end_time ? formatDateTime(r.end_time) : "—"}</td>
            <td>{Math.round(r.duration_minutes ?? r.duration ?? 0)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
