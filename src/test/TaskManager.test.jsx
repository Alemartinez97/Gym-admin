import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskManager from "../components/TaskManager/TaskManager";

describe("TaskManager", () => {
  it("debe renderizar el formulario y lista vacía", () => {
    render(<TaskManager />);

    expect(screen.getByPlaceholderText("Nueva tarea")).toBeInTheDocument();
    expect(screen.getByText("0 completadas / 0 tareas")).toBeInTheDocument();
  });

  it("debe agregar una tarea usando el formulario interno", () => {
    render(<TaskManager />);

    const input = screen.getByPlaceholderText("Nueva tarea");
    const button = screen.getByText("Añadir");

    fireEvent.change(input, { target: { value: "Tarea 1" } });
    fireEvent.click(button);

    expect(screen.getByText("Tarea 1")).toBeInTheDocument();
    expect(screen.getByText("0 completadas / 1 tareas")).toBeInTheDocument();
  });

  it("debe agregar tarea al recibir el evento external-task-add", async () => {
    render(<TaskManager />);

    window.dispatchEvent(
      new CustomEvent("external-task-add", {
        detail: { title: "Desde jQuery" },
      })
    );

    await waitFor(() => {
      expect(screen.getByText("Desde jQuery")).toBeInTheDocument();
    });
    expect(screen.getByText("0 completadas / 1 tareas")).toBeInTheDocument();
  });

  it("debe marcar una tarea como completada y eliminar otra tarea", async () => {
    render(<TaskManager />);
    const input = screen.getByPlaceholderText("Nueva tarea");
    const button = screen.getByText("Añadir");

    fireEvent.change(input, { target: { value: "Tarea 1" } });
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: "Tarea 2" } });
    fireEvent.click(button);
    expect(screen.getByText("Tarea 1")).toBeInTheDocument();
    expect(screen.getByText("Tarea 2")).toBeInTheDocument();
    const tarea1Checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(tarea1Checkbox);
    expect(screen.getByText("1 completadas / 2 tareas")).toBeInTheDocument();
    const tarea2DeleteButton = screen
      .getAllByRole("button")
      .find(
        (btn) =>
          btn.previousSibling?.textContent === "Tarea 2" ||
          btn.textContent === "🗑"
      );
    fireEvent.click(tarea2DeleteButton);
  });
});
