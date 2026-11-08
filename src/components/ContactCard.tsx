'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import type { Contact, Note } from '@prisma/client';
import NoteItem from '@/components/NoteItem';
import AddNoteForm from '@/components/AddNoteForm';

const ContactCard = ({ contact, notes }: { contact: Contact; notes: Note[] }) => (
  <Card className="h-100">
    <Card.Header>
      <Image
        src={contact.image}
        width={75}
        height={75}
        alt={`${contact.firstName} ${contact.lastName}`}
      />
      <Card.Title className="mb-1">
        {contact.firstName} {contact.lastName}
      </Card.Title>
      <Card.Subtitle>
        {contact.address}
      </Card.Subtitle>
    </Card.Header>

    <Card.Body>
      <Card.Text>
        {contact.description}
      </Card.Text>

      <ListGroup variant="flush">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>

      <AddNoteForm
        contactId={contact.id}
        owner={contact.owner}
      />
    </Card.Body>

    <Card.Footer>
      <Link href={`/edit/${contact.id}`}>
        Edit
      </Link>
    </Card.Footer>
  </Card>
);

export default ContactCard;
