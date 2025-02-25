import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  tipo: z.enum(["con_transporte", "sin_transporte"]),
  nombre: z.string().min(1, "El nombre es obligatorio"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ComplexForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: "sin_transporte",
      nombre: "iZaack",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    alert("Formulario enviado");
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded p-6">
      <h2 className="text-xl font-bold mb-4">Formulario de Entrada</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Tipo de Entrada */}
        <div>
          <span className="block text-sm font-medium text-gray-700">Tipo de Entrada</span>
          <Controller
            name="tipo"
            control={control}
            render={({ field }) => (
              <div className="mt-1 flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="sin_transporte"
                    checked={field.value === "sin_transporte"}
                    onChange={() => field.onChange("sin_transporte")}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2">Sin Transporte</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="con_transporte"
                    checked={field.value === "con_transporte"}
                    onChange={() => field.onChange("con_transporte")}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2">Con Transporte</span>
                </label>
              </div>
            )}
          />
        </div>


        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            id="nombre"
            {...register("nombre")}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
