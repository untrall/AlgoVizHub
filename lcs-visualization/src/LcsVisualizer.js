import React, { useState } from 'react';
import './LcsVisualizer.css';

function LcsVisualizer() {
  const [sequence1, setSequence1] = useState('');
  const [sequence2, setSequence2] = useState('');
  const [matrix, setMatrix] = useState([]);
  const [lcsResult, setLCSResult] = useState('');

  const handleInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    // Update input states
    if (inputName === 'sequence1') {
      setSequence1(inputValue);
    } else if (inputName === 'sequence2') {
      setSequence2(inputValue);
    }

    // Clear matrix and LCS result only when a character is deleted
    if (inputName === 'sequence1' && inputValue.length === sequence1.length - 1) {
      setMatrix([]);
      setLCSResult('');
    } else if (inputName === 'sequence2' && inputValue.length === sequence2.length - 1) {
      setMatrix([]);
      setLCSResult('');
    }
  };

  const handleDeleteChar = () => {
    // Clear sequence1, sequence2, matrix, and LCS result
    setSequence1('');
    setSequence2('');
    setMatrix([]);
    setLCSResult('');
  };

  const calculateLCS = () => {
    const len1 = sequence1.length;
    const len2 = sequence2.length;

    const dpMatrix = Array(len1 + 1)
      .fill(null)
      .map(() => Array(len2 + 1).fill(0));

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        if (sequence1[i - 1] === sequence2[j - 1]) {
          dpMatrix[i][j] = dpMatrix[i - 1][j - 1] + 1;
        } else {
          dpMatrix[i][j] = Math.max(dpMatrix[i - 1][j], dpMatrix[i][j - 1]);
        }
      }
    }

    setMatrix(dpMatrix);

    let lcs = '';
    let i = len1;
    let j = len2;

    while (i > 0 && j > 0) {
      if (sequence1[i - 1] === sequence2[j - 1]) {
        lcs = sequence1[i - 1] + lcs;
        i--;
        j--;
      } else if (dpMatrix[i - 1][j] > dpMatrix[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    setLCSResult(lcs);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="sequence1"
          value={sequence1}
          onChange={handleInputChange}
          placeholder="Input Sequence 1"
        />
        <input
          type="text"
          name="sequence2"
          value={sequence2}
          onChange={handleInputChange}
          placeholder="Input Sequence 2"
        />
      </div>
      <br />
      <div>
        <button onClick={calculateLCS}>Calculate LCS</button>
        <span> </span>
        <button onClick={handleDeleteChar}>Reset</button>
      </div>

      <div>
        <h2>LCS Matrix:</h2>
        <div className='container'>
          <table>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                {sequence2.split('').map((char, index) => (
                  <td key={index}>{char}</td>
                ))}
              </tr>
              {matrix.map((row, i) => (
                <tr key={i}>
                  <td>{i > 0 ? sequence1[i - 1] : ''}</td>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2>LCS Result:</h2>
        <p>{lcsResult}</p>
      </div>
    </div>
  );
}

export default LcsVisualizer;
