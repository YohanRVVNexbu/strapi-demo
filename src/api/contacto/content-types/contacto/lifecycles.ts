export default {
  beforeCreate(event: any) {
    const { data } = event.params;
    if (!data.estado) {
      data.estado = 'nuevo';
    }
    if (!data.fechaContacto) {
      data.fechaContacto = new Date().toISOString();
    }
  },
};
