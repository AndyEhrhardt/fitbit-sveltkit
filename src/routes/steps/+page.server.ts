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
    const steps = Number(formData.get('steps'));
    const date = new Date(formData.get('date') as string);

    if (isNaN(steps) || isNaN(date.getTime())) {
      return fail(400, { error: 'Invalid input.' });
    }

    try {
      await prisma.fitbitData.create({
        data: {
          userId: 'placeholder-user-id',
          steps,
          date
        }
      });

      throw redirect(303, '/steps');
    } catch (error) {
      console.error('Error saving data:', error);
      return fail(500, { error: 'Database error.' });
    }
  }
};