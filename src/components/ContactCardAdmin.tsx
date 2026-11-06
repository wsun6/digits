'use client';

import { Card, Image } from 'react-bootstrap';
import type { Contact } from '@prisma/client';

const ContactCardAdmin = ({ contact }: { contact: Contact }) => (
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
      <Card.Text>{contact.description}</Card.Text>
      <p className="blockquote-footer">
        {contact.owner}
      </p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
