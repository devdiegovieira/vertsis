import { Select } from 'antd';

export default function FindPeopleType() {

  return (
    <Select
      allowClear
      placeholder='Seleciona o tipo de Acesso'
      options={[
        { value: 1, label: 'Visitante' },
        { value: 2, label: 'Entregador' },
        { value: 3, label: 'Prestador de Serviço' },
      ]}
    />
  );
};