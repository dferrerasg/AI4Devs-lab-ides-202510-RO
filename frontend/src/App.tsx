import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AddCandidateModal from './AddCandidateModal';
import CandidateForm, { CandidateFormData } from './CandidateForm';
import Toast from './Toast';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleCandidateSubmit = (data: CandidateFormData) => {
    // Show toast on submit (success for now)
    setToast({ message: 'Candidate added successfully!', type: 'success' });
    setModalOpen(false);
  };

  const handleToastClose = () => setToast(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button
        style={{ background: '#ffdf6e', color: '#000', fontWeight: 600, borderRadius: 4, padding: '0.75rem 1.5rem', margin: '2rem 0' }}
        onClick={() => setModalOpen(true)}
        aria-label="Add new candidate"
      >
        Add Candidate
      </button>
      <AddCandidateModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 id="add-candidate-modal-title">Add New Candidate</h2>
        <CandidateForm onSubmit={handleCandidateSubmit} />
      </AddCandidateModal>
      {toast && <Toast message={toast.message} type={toast.type} onClose={handleToastClose} />}
    </div>
  );
}

export default App;
