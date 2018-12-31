import List from '@atoms/List/List';
import Rhythm from '@atoms/Rhythm/Rhythm';
import Button from '@atoms/Button/Button';

/**
  Form element is a re-abstraction of basic form components (input, select, radios and checkboxes).
  Form elements come primed fieldsets, legends (for screen readers), ordered list and submit button; see props for details.
*/
export class Form extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Style variants */
    variant: PropTypes.oneOf(['default']),
    /** Children passed through */
    children: PropTypes.node,
    /** Legend is used to denote an opportunity to describe a group of fields to screen readers */
    legend: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    /** Sets the text of submit button, or allows you to pass/overload with your own element(s). Default is "Submit" */
    submit: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    /** Action is the location to which a form's data will be posted */
    action: PropTypes.string.isRequired,
    /** Method sets the request type of the form (POST or GET) */
    method: PropTypes.oneOf(['get', 'post']).isRequired,
    /** Rhythm allows you to define how much vertical spacing of fields */
    rhythm: PropTypes.oneOf(['small', 'medium', 'large'])    
  };

  static defaultProps = {
    tagName: 'form',
    variant: 'default',
    action: '#/',
    method: 'post',
    rhythm: 'medium',
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      legend,
      submit,
      action,
      method,
      rhythm,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'form',
      `form--${variant}`,
      className
    ]);

    return (
      <Tag
        className={classStack}
        action={action}
        method={method}
        {...attrs}
      > 
        <FormFieldset legend={legend} submit={submit} rhythm={rhythm}>
          {children}
        </FormFieldset>
      </Tag>
    );
  }
}

export class FormFieldset extends React.Component {
  static propTypes = {
    /** Tag overload */
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func
    ]),
    /** Class stacking */
    className: PropTypes.string,
    /** Style variants */
    variant: PropTypes.oneOf(['default']),
    /** Children passed through */
    children: PropTypes.node,
    /** Legend is used to denote an opportunity to describe a group of fields to screen readers */
    legend: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    /** Sets the text of submit button, or allows you to pass/overload with your own element(s) */
    submit: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    /** Rhythm allows you to define how much vertical spacing of fields */
    rhythm: PropTypes.oneOf(['small', 'medium', 'large'])
  };

  static defaultProps = {
    tagName: 'fieldset',
    variant: 'default',
    submit: 'Submit'
  };

  render = () => {
    const {
      tagName: Tag,
      className,
      variant,
      children,
      legend,
      submit,
      rhythm,
      ...attrs
    } = this.props;

    const classStack = Utils.createClassStack([
      'form-fieldset',
      `form-fieldset--${variant}`,
      className
    ]);
    
    const getSubmitButton = () => {
      if (typeof submit === 'string') {
        return (
          <li className="list__item list__item--default">
            <Button type="submit">{submit}</Button>
          </li>
        );
      }
      return (
        <li className="list__item list__item--default">
          {submit}
        </li>
      );
    };

    return (
      <Tag
        className={classStack}
        {...attrs}
      >
        <legend hidden>{legend}</legend>
        <Rhythm tagName="ol" className="list list--blank" size={rhythm}>
          {children}
          {getSubmitButton()}
        </Rhythm>
      </Tag>
    );
  }
}

export default Form;
