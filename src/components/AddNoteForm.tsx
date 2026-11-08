'use client';

import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addNote } from '@/lib/dbActions';
import { AddNoteSchema } from '@/lib/validationSchemas';

type AddNoteFormProps = {
  contactId: number;
  owner: string;
};

const AddNoteForm = ({ contactId, owner }: AddNoteFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddNoteSchema),
    defaultValues: {
      note: '',
      contactId,
      owner,
    },
  });

  const onSubmit = async (data: {
    note: string;
    contactId: number;
    owner: string;
  }) => {
    await addNote(data);
  };

  return (
    <Card className="m-3">
      <Card.Header className="text-center">
        Add Timestamped Note
      </Card.Header>

      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Note</Form.Label>
            <Form.Control
              type="text"
              {...register('note')}
              isInvalid={!!errors.note}
            />
            <Form.Control.Feedback type="invalid">
              {errors.note?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <input
            type="hidden"
            {...register('contactId', {
              valueAsNumber: true,
            })}
          />

          <input
            type="hidden"
            {...register('owner')}
          />

          <div className="d-flex align-items-center" style={{ gap: '100px' }}>
            <Button type="submit" variant="primary">
                Submit
            </Button>

            <Button
                type="button"
                variant="warning"
                onClick={() => reset()}
            >
                Reset
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddNoteForm;
