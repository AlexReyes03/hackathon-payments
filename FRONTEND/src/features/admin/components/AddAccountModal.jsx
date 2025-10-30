import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import contactService from '../../../api/financial/contactService';

export default function AddAccountModal({ show, onHide, onContactAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    bank: '',
    accountNumber: '',
    accountType: 'cuenta',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.bank.trim() || !formData.accountNumber.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const newContact = contactService.addContact(formData);

      setFormData({
        name: '',
        bank: '',
        accountNumber: '',
        accountType: 'cuenta',
      });

      if (onContactAdded) {
        onContactAdded(newContact);
      }

      onHide();
    } catch (err) {
      setError('Error al guardar el contacto');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered contentClassName="bg-dark border-secondary">
      <Modal.Header closeButton className="border-secondary">
        <Modal.Title className="text-white">Agregar Contacto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Nombre del titular</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ej: Juan Pérez" className="bg-secondary border-dark text-white" style={{ backgroundColor: '#2a2a2a' }} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Banco</Form.Label>
            <Form.Control type="text" name="bank" value={formData.bank} onChange={handleChange} placeholder="Ej: BBVA, Santander" className="bg-secondary border-dark text-white" style={{ backgroundColor: '#2a2a2a' }} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Tipo de cuenta</Form.Label>
            <Form.Select name="accountType" value={formData.accountType} onChange={handleChange} className="bg-secondary border-dark text-white" style={{ backgroundColor: '#2a2a2a' }}>
              <option value="cuenta">Cuenta</option>
              <option value="tarjeta">Tarjeta</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Número de {formData.accountType}</Form.Label>
            <Form.Control
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder={formData.accountType === 'cuenta' ? '1234567890' : '1234 5678 9012 3456'}
              maxLength={formData.accountType === 'cuenta' ? 18 : 19}
              className="bg-secondary border-dark text-white"
              style={{ backgroundColor: '#2a2a2a' }}
            />
          </Form.Group>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: '#ffc107',
                border: 'none',
                color: '#000',
              }}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
