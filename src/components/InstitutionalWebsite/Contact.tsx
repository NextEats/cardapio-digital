const Contact = () => {
  return (
    <div className="border-t-[22px] border-t-brand-dark-orange bg-gray-800 py-32">
      <div className="max-w-[1500px] max-w-screen mx-auto p-8 grid grid-cols-1 sm:grid-cols-2">
        <div>
          <h6 className="text-white text-3xl mb-4">Entre em contato conosco</h6>
          <form className="flex flex-col gap-y-4" action="">
            <input placeholder="Nome" className="h-12 p-4" type="text" />
            <input placeholder="Email" className="h-12 p-4" type="text" />
            <textarea placeholder="Digite sua mensagem" className="h-32 p-4" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
