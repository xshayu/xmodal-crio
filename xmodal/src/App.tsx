import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

interface FormData {
  username: string;
  email: string;
  phone: string;
  dob: string;
}

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });

  const handleOpen = () => setIsOpen(true);

  const handleClose = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      resetForm();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const modal = document.querySelector('.modal');
      if (modal && e.target === modal) {
        setIsOpen(false);
        resetForm();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      phone: '',
      dob: '',
    });
  };

  const validateForm = () => {
    // Email validation
    if (formData.email) {
      if (!formData.email.includes('@')) {
        alert('Invalid email. Please check your email address.');
        return false;
      }
    }

    // Phone validation
    if (formData.phone) {
      if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
        alert('Invalid phone number. Please enter a 10-digit phone number.');
        return false;
      }
    }

    // Date validation
    if (formData.dob) {
      const selectedDate = new Date(formData.dob);
      const currentDate = new Date();
      if (selectedDate > currentDate) {
        alert('Invalid date of birth. Date cannot be in the future.');
        return false;
      }
    }

    // Check for empty fields last
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        alert(`Please fill in the ${key} field`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsOpen(false);
      resetForm();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div>
      <button onClick={handleOpen}>Open Form</button>
      
      {isOpen && (
        <div className="modal" onClick={handleClose}>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;