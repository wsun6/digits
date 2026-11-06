'use client';

import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';
import type { Contact } from '@prisma/client';
import { EditContactSchema } from '@/lib/validationSchemas';
import { editContact } from '@/lib/dbActions';

const EditContactForm = ({ contact }: { contact: Contact }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Contact>({
    resolver: yupResolver(EditContactSchema),
    defaultValues: {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: contact.owner,
    },
  });

  const onSubmit = async (data: Contact) => {
    try {
      await editContact({
        id: contact.id,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        image: data.image,
        description: data.description,
        owner: contact.owner,
      });

      swal('Success', 'Contact updated successfully', 'success');
      router.push('/list');
      router.refresh();
    } catch {
      swal('Error', 'Unable to update contact', 'error');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card>
            <Card.Header>
              <h2>Edit Contact</h2>
            </Card.Header>

            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>

                {/* First Name and Last Name */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="py-2">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        isInvalid={!!errors.firstName}
                        {...register('firstName')}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="py-2">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        isInvalid={!!errors.lastName}
                        {...register('lastName')}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Address and Image */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="py-2">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter address"
                        isInvalid={!!errors.address}
                        {...register('address')}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="py-2">
                      <Form.Label>Image URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter image URL"
                        isInvalid={!!errors.image}
                        {...register('image')}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.image?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Description */}
                <Row>
                  <Col>
                    <Form.Group className="py-2">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Enter description"
                        isInvalid={!!errors.description}
                        {...register('description')}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Buttons */}
                <Form.Group className="py-3">
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                  {' '}
                  <Button
                    type="button"
                    variant="warning"
                    onClick={() => reset()}
                  >
                    Reset
                  </Button>
                </Form.Group>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditContactForm;
