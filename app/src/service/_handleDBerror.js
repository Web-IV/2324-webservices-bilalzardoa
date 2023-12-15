const ServiceError = require('../core/serviceError');

const handleDBError = (error) => {
  const { code = '', sqlMessage } = error;

  if (code === 'ER_DUP_ENTRY') {
    switch (true) {
      case sqlMessage.includes('idx_users_username_unique'):
        return ServiceError.validationFailed(
          'username already exists'
        );
      case sqlMessage.includes('idx_users_email_unique'):
        return ServiceError.validationFailed(
          'email already taken'
        );
      case sqlMessage.includes('idx_users_password_unique'):
          return ServiceError.validationFailed(
            'password already exists'
        );
        case sqlMessage.includes('idx_journal_Date_unique'):
            return ServiceError.validationFailed(
              'there already is a journal for this date'
          );
      default:
        return ServiceError.validationFailed('duplicate entry');
    }
  }

  if (code.startsWith('ER_NO_REFERENCED_ROW')) {
    switch (true) {
      case sqlMessage.includes('fk_users_id'):
        return ServiceError.notFound('This user does not exist');
      case sqlMessage.includes('fk_journal_id'):
        return ServiceError.notFound('This journal does not exist');

        default:
        return ServiceError.notFound('Referenced row does not exist');

    }
  }

  // Return error because we don't know what happened
  return error;
};

module.exports = handleDBError;