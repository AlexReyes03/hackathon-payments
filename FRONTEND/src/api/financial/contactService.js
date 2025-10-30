const CONTACTS_KEY = 'ezpay_bank_accounts';

class ContactService {
  getAllContacts() {
    try {
      const contacts = localStorage.getItem(CONTACTS_KEY);
      return contacts ? JSON.parse(contacts) : [];
    } catch (error) {
      console.error('Error loading contacts:', error);
      return [];
    }
  }

  addContact(contact) {
    try {
      const contacts = this.getAllContacts();
      const newContact = {
        id: Date.now().toString(),
        name: contact.name,
        bank: contact.bank,
        accountNumber: contact.accountNumber,
        accountType: contact.accountType,
        initials: contact.name.substring(0, 2).toUpperCase(),
        color: this.generateColor(contact.name),
        createdAt: new Date().toISOString(),
      };
      contacts.push(newContact);
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
      return newContact;
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  }

  updateContact(id, updates) {
    try {
      const contacts = this.getAllContacts();
      const index = contacts.findIndex((c) => c.id === id);
      if (index !== -1) {
        contacts[index] = { ...contacts[index], ...updates };
        localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
        return contacts[index];
      }
      return null;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  }

  deleteContact(id) {
    try {
      const contacts = this.getAllContacts();
      const filtered = contacts.filter((c) => c.id !== id);
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }

  generateColor(name) {
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#f97316', '#a855f7', '#14b8a6'];
    const index = name.length % colors.length;
    return colors[index];
  }
}

export default new ContactService();