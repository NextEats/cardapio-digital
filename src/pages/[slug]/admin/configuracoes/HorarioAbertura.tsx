/* eslint-disable react-hooks/rules-of-hooks */
import TextFiled from '@/src/components/globalComponents/Inputs';
import Modal from '@/src/components/globalComponents/Modal';
import Select from '@/src/components/globalComponents/select';
import Button from '@/src/components/nButton';
import { AdminContext } from '@/src/contexts/adminContext';
import { supabase } from '@/src/server/api';
import * as Switch from '@radix-ui/react-switch';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function HorariosAbertura() {
  const { restaurant } = useContext(AdminContext);

  const [horariosAbertura, sethorariosAbertura] = useState<any>([]);
  const [weekDays, setweekDays] = useState<any>([]);

  useEffect(() => {
    const fetchWorkdayTime = async () => {
      const { data: horariosAbertura, error } = await supabase
        .from('weekday_operating_time')
        .select('*,weekdays(*)')
        .eq('restaurant_id', restaurant?.id);
      if (error) {
        console.error(error);
      } else {
        // console.log(restaurant?.id);
        // console.log(horariosAbertura);
        sethorariosAbertura(horariosAbertura);
      }
      const { data: weekDays } = await supabase.from('weekdays').select('*');
      if (error) {
        console.error(error);
      } else {
        const tempoWeekDays: { id: number; label: string }[] = [];
        weekDays?.map(item => {
          tempoWeekDays.push({
            id: item.id,
            label: item.name,
          });
        });
        setweekDays(tempoWeekDays.sort((a, b) => a.id - b.id));
      }
    };

    fetchWorkdayTime();
  }, [restaurant]);

  if (!restaurant) {
    return null;
  }

  const addWorkHour = async (
    startHr: string,
    endHr: string,
    weekId: number
  ) => {
    try {
      // Verificar se já existe um horário salvo com o mesmo weekday_id e intervalo de horário
      const { data: existingWorkHours, error: fetchError } = await supabase
        .from('weekday_operating_time')
        .select('*')
        .eq('weekday_id', weekId)
        .lte('opening_time', endHr)
        .gte('closing_time', startHr);

      if (fetchError) {
        throw fetchError;
      }

      if (existingWorkHours?.length) {
        toast.error('Conflito entre Horarios de abertura');
        return;
      }

      // Se o horário ainda não existir, adicionar um novo
      const { data: newWorkOperationTime, error: insertError } = await supabase
        .from('weekday_operating_time')
        .insert({
          opening_time: startHr,
          closing_time: endHr,
          weekday_id: weekId,
          is_active: true,
          restaurant_id: restaurant.id,
        })
        .select('*,weekdays(*)');

      if (insertError) {
        throw insertError;
      }

      newWorkOperationTime
        ? sethorariosAbertura([...horariosAbertura, newWorkOperationTime[0]])
        : null;
    } catch (err) {
      console.error(err);
    }
  };
  const updateStatus = async (id: number, status: boolean) => {
    try {
      const { data: newWorkOperationTime, error } = await supabase
        .from('weekday_operating_time')
        .update({
          is_active: status,
        })
        .match({ id })
        .select('*');
      if (newWorkOperationTime) {
        const index = horariosAbertura.findIndex(
          (item: { id: number }) => item.id === id
        );
        const tempHorariosDeAbertura = horariosAbertura.map(
          (item: any, i: any) => {
            if (i === index) {
              return {
                id: item.id,
                created_at: item.created_at,
                weekday_id: item.weekday_id,
                is_active: status,
                restaurant_id: item.restaurant_id,
                opening_time: item.opening_time,
                closing_time: item.closing_time,
                weekdays: {
                  id: item.weekdays.id,
                  created_at: item.weekdays.created_at,
                  name: item.weekdays.name,
                },
              };
            } else {
              return item;
            }
          }
        );
        sethorariosAbertura(tempHorariosDeAbertura);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const updateHour = async (
    startHr: string,
    endHr: string,
    weekId: number,
    editId: number
  ) => {
    try {
      const { data: updatedWorkOperationTime, error: updateError } =
        await supabase
          .from('weekday_operating_time')
          .update({
            opening_time: startHr,
            closing_time: endHr,
            weekday_id: weekId,
            restaurant_id: restaurant.id,
          })
          .eq('id', editId)
          .select('*,weekdays(*)');

      if (updateError) {
        throw updateError;
      }

      // Atualiza o registro no array horariosAbertura com o novo dado
      const updatedIndex = horariosAbertura.findIndex(
        (item: { id: number }) => item.id === editId
      );
      const updatedData = updatedWorkOperationTime[0];
      const updatedArray = [...horariosAbertura];
      updatedArray.splice(updatedIndex, 1, updatedData);
      sethorariosAbertura(updatedArray);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteWorkHour = async (id: number) => {
    const { error } = await supabase
      .from('weekday_operating_time')
      .delete()
      .match({ id });
    if (error) console.error(error);
    else
      sethorariosAbertura(horariosAbertura.filter((fee: any) => fee.id !== id));
  };
  const [startHr, setStartHr] = useState<string>();
  const [endHr, setEndHr] = useState<string>();
  const [weekId, setWeekId] = useState<number>();

  const handleAddWorkHour = () => {
    if (isEdit) {
      if (startHr && endHr && weekId && editId) {
        updateHour(startHr, endHr, weekId, editId);
      }
    } else {
      console.log(startHr, endHr, weekId);
      if (startHr && endHr && weekId) {
        addWorkHour(startHr, endHr, weekId);
      }
    }
    toggleModal();
    clearInputs();
  };
  function clearInputs() {
    setStartHr('');
    setEndHr('');
    setWeekId(0);
  }
  const handleDeleteWorkHour = (id: number) => {
    if (
      window.confirm('Tem certeza que deseja excluir essa taxa de entrega?')
    ) {
      deleteWorkHour(id);
    }
  };
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>();
  const handleEditWorkHour = (row: any) => {
    console.log(row.opening_time, row.closing_time, row.weekday_id);
    setStartHr(row.opening_time);
    setEndHr(row.closing_time);
    setWeekId(row.weekday_id);
    setShowModal(true);
    setIsEdit(true);
    setEditId(row.id);
  };

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
    setIsEdit(false);
    clearInputs();
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Horario De Abertura</h1>
        <div className="w-full text-right">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 mt-8"
            onClick={toggleModal}
          >
            Adicionar nova taxa de entrega
          </button>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Dia da Semana</th>
              <th className="px-4 py-2">Horario Abertura/Fechamento</th>
              <th className="px-4 py-2">Aberto/Fechado</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {horariosAbertura.map((item: any) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.weekdays.name}</td>
                <td className="border px-4 py-2">{`${item.opening_time} - ${item.closing_time}`}</td>
                <td className="border px-4 py-2 text-center">
                  <Switch.Root
                    className="w-[42px] h-6 bg-gray-400 rounded-full relative data-[state=checked]:bg-brand-dark-orange outline-none cursor-default"
                    id={item.id}
                    onCheckedChange={(checked: boolean) =>
                      updateStatus(item.id, checked)
                    }
                    checked={item.is_active}
                  >
                    <Switch.Thumb
                      className="block w-[18px] h-[18px] bg-white rounded-full transition-transform
                                            duration-100 translate-x-1 will-change-transform data-[state=checked]:translate-x-[20px]"
                    />
                  </Switch.Root>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 ml-3 mr-3 rounded-md"
                    onClick={() =>
                      item.id
                        ? handleEditWorkHour(item)
                        : console.error('id não encontrado')
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 ml-3 mr-3 rounded-md"
                    onClick={() =>
                      item.id
                        ? handleDeleteWorkHour(item.id)
                        : console.error('id não encontrado')
                    }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title="Horario De Abertura"
        showModal={showModal}
        closeFunction={toggleModal}
        onSubmitFunction={handleAddWorkHour}
      >
        <Modal.Body>
          <TextFiled
            required
            Type="time"
            value={startHr}
            setValue={setStartHr}
            placeHolder="Horario de Abertura"
            label="Horario de Abertura"
          />
          <TextFiled
            required
            Type="time"
            value={endHr}
            setValue={setEndHr}
            placeHolder="Digite o Horario de Fechamento"
            label="Horario de Fechamento"
          />
          <Select
            required
            Type="time"
            value={weekId}
            setValue={setWeekId}
            placeHolder="Digite o Horario de Fechamento"
            label="Horario de Fechamento"
            options={weekDays}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button Type="submit" text={isEdit ? 'Atualizar' : 'Cadastrar'} />
          <Button
            Type="button"
            bgColor="red"
            text="Cancelar"
            OnClick={toggleModal}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
function preventDefault() {
  throw new Error('Function not implemented.');
}
