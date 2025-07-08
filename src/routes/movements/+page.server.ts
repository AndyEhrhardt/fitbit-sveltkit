import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma'; // Adjust the import based on your project structure

export const load = async () => {
    const entries = await prisma.fitbitData.findMany({
      orderBy: { date: 'desc' }
    });
  
    return { entries };
  };  

export const actions = {
  submit: async ({ request }) => {
    const formData = await request.formData();
    const movement = Number(formData.get('movement'));

    // check if movement is a string
    if (typeof movement !== 'string') {
      return fail(400, { error: 'Invalid input.' });
    }

    try {
      await prisma.fitbitData.create({
        data: {
          
        }
      });

      throw redirect(303, '/steps');
    } catch (error) {
      console.error('Error saving data:', error);
      return fail(500, { error: 'Database error.' });
    }
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = Number(formData.get('id'));

    if (isNaN(id)) {
      return fail(400, { error: 'Invalid ID.' });
    }

    try {
      await prisma.fitbitData.delete({
        where: { id }
      });

      throw redirect(303, '/steps');
    } catch (error) {
      console.error('Error deleting entry:', error);
      return fail(500, { error: 'Could not delete entry.' });
    }
  }, 
  edit: async ({ request }) => {
    const formData = await request.formData();
    const id = Number(formData.get('id'));
    const steps = Number(formData.get('steps'));
    const date = new Date(formData.get('date') as string);

    if (isNaN(id) || isNaN(steps) || isNaN(date.getTime())) {
      return fail(400, { error: 'Invalid input.' });
    }

    try {
      await prisma.fitbitData.update({
        where: { id },
        data: {
          steps,
          date
        }
      });

      throw redirect(303, '/steps');
    } catch (error) {
      console.error('Error updating entry:', error);
      return fail(500, { error: 'Update failed.' });
    }
  }
};