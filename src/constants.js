export const FIELDS = [{
    name: 'firstName',
    label: 'First Name',
    errorText: 'Invalid First Name',
    errorRules: /^[a-zA-Z]+$/
}, {
    name: 'lastName',
    label: 'Last Name',
    errorText: 'Invalid Last Name',
    errorRules: /^[a-zA-Z]+$/
}, {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    errorText: 'Date of Birth is required',
    date: true,
    autoOk: true,
}, {
    name: 'phone',
    label: 'Phone',
    errorText: 'Invalid Phone',
    errorRules: /^\+[0-9]+$/
}];

export const OPTIONS_DATE = {year: 'numeric', month: 'numeric', day: 'numeric'};

export const FIELD_OPTIONS = [{key: 'id', value: 'Id'}, ...FIELDS.map(i => { return {key: i.name, value: i.label}; })];
