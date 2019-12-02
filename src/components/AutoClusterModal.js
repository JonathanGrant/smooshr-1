import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import {useStateValue, useColumn} from '../contexts/app_context';
import {calc_embedings} from '../utils/calc_embedings';
import {calcEmbedingClusters} from '../utils/text_clustering';
import {Range} from 'react-range';

export default function AutoClusterModal({match, history}) {
  const {columnID} = match.params;
  const onClose = () => history.goBack();
  const [mappings, setMappings] = useState([]);
  const [clusters, setClusters] = useState([]);

  const [noClusters, setNoClusters] = useState(10);

  const {column, entries} = useColumn(columnID);

  const calcCategories = () => {
    calc_embedings(entries).then(embeds => {
      const clusters = calcEmbedingClusters(embeds, noClusters);
      setClusters(clusters);
    });
  };

  useEffect(() => {
    if (entries && entries.length > 0) {
    }
  }, [entries]);

  return (
    <ReactModal isOpen={true} onRequestClose={onClose}>
      <h1>Detect categories</h1>
      <span>No clusters: {noClusters}</span>
      <Range
        style={{width: '200px'}}
        max={20}
        min={2}
        step={1}
        values={[noClusters]}
        onChange={values => setNoClusters(values[0])}
        renderTrack={({props, children}) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ccc',
            }}>
            {children}
          </div>
        )}
        renderThumb={({props}) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '42px',
              width: '42px',
              backgroundColor: '#999',
            }}
          />
        )}
      />
      {clusters.length > 0 &&
        [...Array(noClusters)].map((_, i) => (
          <div key={i}>
            <h3>Cluster {i+1}</h3>
            <p>
              {' '}
              {clusters
                .filter(c => c.cluster === i)
                .map(c => c.entry)
                .join(', ')}
            </p>
          </div>
        ))}
      <button onClick={calcCategories}>Calc categories</button>
    </ReactModal>
  );
}