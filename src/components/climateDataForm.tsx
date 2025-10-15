import React, { useState } from 'react';
import { ApiPromise } from '@polkadot/api';
import { ClimateData } from '../types';

interface Props {
  api: ApiPromise | null;
  account: any;
  onDataSubmit: (data: ClimateData) => void;
}

export const ClimateDataForm: React.FC<Props> = ({ api, account, onDataSubmit }) => {
  const [formData, setFormData] = useState({
    lat: '',
    lng: '',
    temperature: '',
    co2Level: '',
    deforestationArea: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!api) return;

    try {
      // Submit to blockchain
      const tx = api.tx.climateModule.submitData(
        parseFloat(formData.lat),
        parseFloat(formData.lng),
        parseFloat(formData.temperature),
        parseFloat(formData.co2Level),
        parseFloat(formData.deforestationArea)
      );

      await tx.signAndSend(account.address, ({ status }) => {
        if (status.isInBlock) {
          const newData: ClimateData = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            coordinates: {
              lat: parseFloat(formData.lat),
              lng: parseFloat(formData.lng)
            },
            temperature: parseFloat(formData.temperature),
            co2Level: parseFloat(formData.co2Level),
            deforestationArea: parseFloat(formData.deforestationArea),
            verified: false,
            submittedBy: account.address
          };
          
          onDataSubmit(newData);
          setFormData({ lat: '', lng: '', temperature: '', co2Level: '', deforestationArea: '' });
        }
      });
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Submit Climate Data</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="number"
            placeholder="Latitude"
            value={formData.lat}
            onChange={(e) => setFormData({...formData, lat: e.target.value})}
            step="any"
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="number"
            placeholder="Longitude"
            value={formData.lng}
            onChange={(e) => setFormData({...formData, lng: e.target.value})}
            step="any"
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="number"
            placeholder="Temperature (°C)"
            value={formData.temperature}
            onChange={(e) => setFormData({...formData, temperature: e.target.value})}
            step="any"
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="number"
            placeholder="CO2 Level (ppm)"
            value={formData.co2Level}
            onChange={(e) => setFormData({...formData, co2Level: e.target.value})}
            step="any"
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="number"
            placeholder="Deforestation Area (hectares)"
            value={formData.deforestationArea}
            onChange={(e) => setFormData({...formData, deforestationArea: e.target.value})}
            step="any"
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none' }}>
          Submit to Blockchain
        </button>
      </form>
    </div>
  );
};