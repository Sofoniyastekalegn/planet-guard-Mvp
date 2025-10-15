import React from 'react';
import { ClimateData, AIAnalysis } from '../types';

interface Props {
  climateData: ClimateData[];
  aiAnalyses: AIAnalysis[];
}

export const DataDashboard: React.FC<Props> = ({ climateData, aiAnalyses }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Climate Data Dashboard</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>Recent Submissions</h4>
        {climateData.slice(-5).map(data => (
          <div key={data.id} style={{ 
            padding: '10px', 
            margin: '5px 0', 
            background: '#f5f5f5',
            borderLeft: `4px solid ${data.verified ? '#4CAF50' : '#ff9800'}`
          }}>
            <div>📍 {data.coordinates.lat}, {data.coordinates.lng}</div>
            <div>🌡 {data.temperature}°C | 🏭 {data.co2Level}ppm</div>
            <div>🌳 Deforestation: {data.deforestationArea}ha</div>
            <small>By: {data.submittedBy.slice(0, 10)}... | {new Date(data.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>

      <div>
        <h4>AI Analysis</h4>
        {aiAnalyses.length === 0 ? (
          <p>No AI analysis available. Submit data to get insights.</p>
        ) : (
          aiAnalyses.map(analysis => (
            <div key={analysis.dataId} style={{ padding: '10px', background: '#e3f2fd', margin: '5px 0' }}>
              <div>Risk Level: <strong>{analysis.riskLevel.toUpperCase()}</strong></div>
              <div>Confidence: {(analysis.confidence * 100).toFixed(1)}%</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};