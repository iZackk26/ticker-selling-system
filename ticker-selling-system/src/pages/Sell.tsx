import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  tipo: z.enum(["con_transporte", "sin_transporte"]),
  carnet: z.string().min(5, "El carnet debe tener al menos 5 caracteres"),
  fecha_entrada: z.string().min(1, "La fecha es obligatoria"),
  hora_entrada: z.string().min(1, "La hora es obligatoria"),
  ubicacion: z.string().min(1, "La ubicación es obligatoria"),
  numero_entradas: z.number().min(1, "El número de entradas debe ser al menos 1"),
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
      numero_entradas: 1,
      ubicacion: "El vago",
      hora_entrada: "20:00",
      fecha_entrada: "2025-03-06",
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

        {/* Carnet */}
        <div>
          <label htmlFor="carnet" className="block text-sm font-medium text-gray-700">
            Carnet
          </label>
          <input
            id="carnet"
            {...register("carnet")}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.carnet && <p className="text-red-500 text-sm mt-1">{errors.carnet.message}</p>}
        </div>

        {/* Fecha de Entrada */}
        <div>
          <label htmlFor="fecha_entrada" className="block text-sm font-medium text-gray-700">
            Fecha de Entrada
          </label>
          <input
            id="fecha_entrada"
            type="date"
            {...register("fecha_entrada")}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.fecha_entrada && <p className="text-red-500 text-sm mt-1">{errors.fecha_entrada.message}</p>}
        </div>

        {/* Hora de Entrada */}
        <div>
          <label htmlFor="hora_entrada" className="block text-sm font-medium text-gray-700">
            Hora de Entrada
          </label>
          <input
            id="hora_entrada"
            type="time"
            {...register("hora_entrada")}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.hora_entrada && <p className="text-red-500 text-sm mt-1">{errors.hora_entrada.message}</p>}
        </div>

        {/* Ubicación */}
        <div>
          <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700">
            Ubicación
          </label>
          <input
            id="ubicacion"
            {...register("ubicacion")}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.ubicacion && <p className="text-red-500 text-sm mt-1">{errors.ubicacion.message}</p>}
        </div>

        {/* Número de Entradas */}
        <div>
          <label htmlFor="numero_entradas" className="block text-sm font-medium text-gray-700">
            Número de Entradas
          </label>
          <input
            id="numero_entradas"
            type="number"
            min="1"
            {...register("numero_entradas", { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.numero_entradas && (
            <p className="text-red-500 text-sm mt-1">{errors.numero_entradas.message}</p>
          )}
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
