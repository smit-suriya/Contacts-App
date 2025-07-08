import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { deleteContact, getContacts } from "../../auth/services/contactApi";
import ContactListLI from "../../../components/ui/ContactListLI";
import DeleteConfirmModal from "../../../components/ui/DeleteConfirmModal";

type Contact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
};

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  const fetchContacts = async (search: string = "") => {
    try {
      const res = await getContacts(search);
      setContacts(res.allContacts);
    } catch (error) {
      toast.error("Failed to fetch contacts");
    }
  };

  // Debounce search
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      fetchContacts(term);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleDeleteClick = (contact: Contact) => {
    setContactToDelete(contact);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!contactToDelete) return;

    try {
      await deleteContact(contactToDelete._id);
      toast.success("Contact deleted");
      await fetchContacts();
    } catch (err) {
      toast.error("Failed to Delete Contact");
    } finally {
      setContactToDelete(null);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between bg-gray-300 p-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-600">Contacts</h1>
        </div>
        <div>
          <input
            type="text"
            className="w-75 p-2 border border-cyan-50 rounded-xl focus:outline-none focus:border-gray-800"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {contacts.length > 0 ? (
        <div>
          <ul className="p-3 mt-2">
            {contacts.map((contact) => (
              <ContactListLI
                key={contact._id}
                contact={contact}
                onDelete={handleDeleteClick}
              />
            ))}
          </ul>
        </div>
      ) : (
        <p className="p-4 text-2xl text-gray-700 font-semibold">No contacts</p>
      )}

      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={contactToDelete?.name}
      />
    </>
  );
};

export default ContactList;
