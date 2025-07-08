import { Link } from "react-router-dom";

type Contact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
};

type Props = {
  contact: Contact;
  onDelete: (contact: Contact) => void;
};

const ContactListLI = ({ contact, onDelete }: Props) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow duration-200 my-4">
      <li>
        <div className="flex justify-between items-center">
          <div>
            <strong>{contact.name}</strong> - {contact.email} - {contact.phone}
          </div>
          <div className="flex space-x-4">
            <Link className="btn-1" to={`/edit-contact/${contact._id}`}>
              Edit
            </Link>
            <button
              className="border-1 px-4 py-2 rounded text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
              onClick={() => onDelete(contact)}
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    </div>
  );
};

export default ContactListLI;
