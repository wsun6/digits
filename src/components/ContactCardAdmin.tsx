'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import type { Contact, Note } from '@prisma/client';
import NoteItem from '@/components/NoteItem';

const ContactCardAdmin = ({
  contact,
  notes,
}: {
  contact: Contact;
  notes: Note[];
}) => (
  <Card className="h-100">
    <Card.Header>
      <Image
        src={contact.image}
        width={75}
        height={75}
        alt={`${contact.firstName} ${contact.lastName}`}
      />

      <Card.Title className="mt-2">
        {contact.firstName} {contact.lastName}
      </Card.Title>

      <Card.Subtitle className="text-muted">
        {contact.address}
      </Card.Subtitle>
    </Card.Header>

    <Card.Body>
      <Card.Text>
        {contact.description}
      </Card.Text>
    </Card.Body>

    <ListGroup variant="flush">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ListGroup>

    <Card.Footer>
      <Link href={`/edit/${contact.id}`}>
        Edit
      </Link>

      <div className="text-muted mt-2">
        Owner: {contact.owner}
      </div>
    </Card.Footer>
  </Card>
);

export default ContactCardAdmin;
