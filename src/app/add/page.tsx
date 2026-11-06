import { Container } from 'react-bootstrap';
import AddContactForm from '@/components/AddContactForm';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

/** Render the Add Contact page for logged-in users. */
const AddPage = async () => {
  // Protect the page.
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  // Get the logged-in user's email.
  const owner = (session && session.user && session.user.email) || '';

  return (
    <main>
      <Container className="py-3">
        <AddContactForm owner={owner} />
      </Container>
    </main>
  );
};

export default AddPage;
