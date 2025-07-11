import { fail, redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma"; // Adjust the import based on your project structure

export const load = async () => {
  const entries = await prisma.movement.findMany();

  return { entries };
};

export const actions = {
  submit: async ({ request }) => {
    const formData = await request.formData();
    const movement = String(formData.get("movement"));

    // check if movement is a string
    if (typeof movement !== "string") {
      return fail(400, { error: "Invalid input." });
    }

    try {
      await prisma.movement.create({
        data: {
          name: movement,
        },
      });

      return { success: true, message: "Movement saved successfully." };
    } catch (error) {
      console.error("Error saving data:", error);
      return fail(500, { error: "Database error." });
    }
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = String(formData.get("id"));

    try {
      await prisma.movement.delete({
        where: { id },
      });

      return { success: true, message: "Movement deleted successfully." };
    } catch (error) {
      console.error("Error deleting entry:", error);
      return fail(500, { error: "Could not delete entry." });
    }
  },
  edit: async ({ request }) => {
    const formData = await request.formData();
    const id = String(formData.get("id"));
    const name = String(formData.get("name"));
    console.log(id, name);
    if (typeof id !== "string" || typeof name !== "string") {
      return fail(400, { error: "Invalid input." });
    }

    try {
      await prisma.movement.update({
        where: { id },
        data: {
          name,
        },
      });
      return { success: true, message: "Movement updated successfully." };
    } catch (error) {
      console.error("Error updating entry:", error);
      return fail(500, { error: "Update failed." });
    }
  },
};
