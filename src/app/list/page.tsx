import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import ContactCard from '@/components/ContactCard';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

/** Render a list of contacts for the logged in user. */
const ListPage = async () => {
  // Protect the page so only logged-in users can access it.
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  // Get the email address of the logged-in user.
  const owner = (session && session.user && session.user.email) || '';

  // Get only the contacts belonging to this user.
  const contacts = await prisma.contact.findMany({
    where: {
      owner,
    },
  });

  // Get all notes belonging to the logged-in user.
  const notes = await prisma.note.findMany({
    where: {
      owner,
    },
  });

  return (
    <main>
      <Container id="list" className="py-4">
        <h1 className="text-center mb-5">
          List Contacts
        </h1>

        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((contact) => (
            <Col key={`Contact-${contact.id}`}>
              <ContactCard
                contact={contact}
                notes={notes.filter(
                  (note) => note.contactId === contact.id
                )}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
