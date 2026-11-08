import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import ContactCardAdmin from '@/components/ContactCardAdmin';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

/** Display all contacts for administrators. */
const AdminPage = async () => {
  // Protect the page.
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const contacts = await prisma.contact.findMany({
    include: {
      notes: true,
    },
  });

  return (
    <main>
      <Container id="admin" className="py-4">
        <h1 className="text-center mb-4">
          List Contacts (Admin)
        </h1>

        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((contact) => (
            <Col key={`Contact-${contact.id}`}>
              <ContactCardAdmin
                contact={contact}
                notes={contact.notes}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
