import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  submit: async ({ request }) => {
    const formData = await request.formData();
    const steps = Number(formData.get('steps'));
    const date = new Date(formData.get('date') as string);

    if (isNaN(steps) || isNaN(date.getTime())) {
      return fail(400, { error: 'Invalid input.' });
    }

    try {
      await prisma.FitbitData.create({
        data: {
          userId: 'placeholder-user-id', // we'll replace this later with OAuth userId
          steps,
          date
        }
      });

      throw redirect(303, '/success'); // or wherever you want to send them after
    } catch (error) {
      console.error('Error saving data:', error);c
      return fail(500, { error: 'Database error.' });
    }
  }
};