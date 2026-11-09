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
import swal from 'sweetalert';
import { addContact } from '@/lib/dbActions';
import { AddContactSchema } from '@/lib/validationSchemas';

type AddContactFormValues = {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
};

const AddContactForm = ({ owner }: { owner: string }) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddContactFormValues>({
    resolver: yupResolver(AddContactSchema.omit(['owner'])),
  });

  const onSubmit = async (data: AddContactFormValues) => {
    const {
      firstName,
      lastName,
      address,
      image,
      description,
    } = data;

    try {
      await addContact({
        firstName,
        lastName,
        address,
        image,
        description,
        owner,
      });

      swal('Success', 'Contact added successfully', 'success');
      reset();
    } catch {
      swal('Error', 'Unable to add contact', 'error');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={10}>
          <Card>
            <Card.Header>
              <h2>Add Contact</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
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

export default AddContactForm;
