import { Contact } from '../../database/entities/Contact.ts';
import ContactsRepositories from '../repositories/ContactsRepositories.ts';
import {
  Lifecycle,
  ReqRefDefaults,
  Request,
  ResponseToolkit,
} from '@hapi/hapi';

type ServerRouteHandler = Lifecycle.Method;

type IControllers<
  Params extends Parameters<ServerRouteHandler> = Parameters<ServerRouteHandler>,
  R extends ReturnType<ServerRouteHandler> = ReturnType<ServerRouteHandler>,
> = {
  index(...args: Params): Promise<R>;
  show(...args: Params): Promise<R>;
  store(...args: Params): Promise<R>;
  update(...args: Params): Promise<R>;
  delete(...args: Params): Promise<R>;
};

class ContactsController implements IControllers {
  async index(
    _request: Request<ReqRefDefaults>,
    h: ResponseToolkit<ReqRefDefaults>,
    _err?: Error | undefined,
  ): Promise<Lifecycle.ReturnValue<ReqRefDefaults>> {
    const contacts = await ContactsRepositories.findAll();

    return h.response(contacts).code(200);
  }

  async show(
    request: Request<ReqRefDefaults>,
    h: ResponseToolkit<ReqRefDefaults>,
    _err?: Error | undefined,
  ): Promise<Lifecycle.ReturnValue<ReqRefDefaults>> {
    const { id } = request.params;

    const contact = await ContactsRepositories.findById(id);

    if (!contact) {
      return h
        .response({
          error: 'Contato não encontrado',
        })
        .code(404);
    }

    return contact;
  }

  async store(
    request: Request<ReqRefDefaults>,
    h: ResponseToolkit<ReqRefDefaults>,
    _err?: Error | undefined,
  ): Promise<Lifecycle.ReturnValue<ReqRefDefaults>> {
    const data = request.payload;

    const isDataValid = (
      data: unknown,
    ): data is Omit<Contact, 'id' | 'category'> & { categoryId?: string } => {
      if (typeof data === 'object' && data !== null) {
        const hasName =
          'name' in data && typeof data.name === 'string' && !!data.name;

        return hasName;
      }

      return false;
    };

    if (!isDataValid(data)) {
      return h
        .response({
          error:
            'Dados para criação do contato estão inválidos ou insuficientes',
        })
        .code(401);
    }

    const contactWithEmail = await ContactsRepositories.findByEmail(data.email);

    if (contactWithEmail) {
      return h
        .response({
          error: 'Um contato com o e-mail fornecido já está cadastrado',
        })
        .code(401);
    }

    const contact = await ContactsRepositories.createContact(data);

    return h.response(contact).code(200);
  }

  async update(
    request: Request<ReqRefDefaults>,
    h: ResponseToolkit<ReqRefDefaults>,
  ): Promise<Lifecycle.ReturnValue<ReqRefDefaults>> {
    const data = request.payload;

    const isDataValid = (
      data: unknown,
    ): data is Partial<Omit<Contact, 'id'>> & Pick<Contact, 'id'> => {
      return (
        typeof data === 'object' &&
        data !== null &&
        'id' in data &&
        typeof data.id === 'string' &&
        !!data.id
      );
    };

    if (!isDataValid(data)) {
      return h
        .response({
          error:
            'Dados para criação do contato estão inválidos ou insuficientes',
        })
        .code(401);
    }

    if (data.email) {
      const hasContactWithEmail = await ContactsRepositories.findByEmail(
        data.email,
      );

      const hasContactWithId = await ContactsRepositories.findById(data.id);

      if (
        hasContactWithEmail &&
        hasContactWithId &&
        hasContactWithEmail.id !== hasContactWithId.id
      ) {
        return h
          .response({
            error: 'Um contato com este email já existe',
          })
          .code(401);
      }
    }

    const updatedContact = await ContactsRepositories.update(data);

    return h.response(updatedContact).code(200);
  }

  async delete(
    request: Request<ReqRefDefaults>,
    h: ResponseToolkit<ReqRefDefaults>,
    _err?: Error | undefined,
  ): Promise<Lifecycle.ReturnValue<ReqRefDefaults>> {
    const { id } = request.params;

    const contact = await ContactsRepositories.removeById(id);

    return contact
      ? h.response(contact).code(200)
      : h
          .response({
            error: 'Contato não encontrado',
          })
          .code(404);
  }
}

const controller = new ContactsController();

export default controller;
export { ContactsController };
