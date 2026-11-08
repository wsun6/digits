import { notFound } from 'next/navigation';
import { Container } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { loggedInProtectedPage } from '@/lib/page-protection';
import EditContactForm from '@/components/EditContactForm';

const EditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  // Check authentication.
  const session = await auth();

  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const { id } = await params;
  const contactId = Number(id);

  if (!Number.isInteger(contactId) || contactId <= 0) {
    notFound();
  }

  // Get the logged-in user's email.
  const owner = session?.user?.email;

  if (!owner) {
    notFound();
  }

  // Retrieve the selected contact.
  const contact = await prisma.contact.findFirst({
    where: {
      id: contactId,
      owner,
    },
  });

  if (!contact) {
    notFound();
  }

  return (
    <main>
      <Container className="py-3">
        <EditContactForm contact={contact} />
      </Container>
    </main>
  );
};

export default EditPage;
