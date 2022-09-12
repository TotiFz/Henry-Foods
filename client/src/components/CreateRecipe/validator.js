let validate = (value) => {
    let errors = {}
    if (value.title) {
		errors.title = '';
	} else {
		errors.title = 'Type a Title';
	}
	if (value.healthScore) {
		errors.healthScore = '';
	} else if (!/^(?!$)(?:[0-9]{1,2}|100)$/gm.test(value.healthScore)) {
		errors.healthScore = 'The Health Score must be between 0 and 100';
	} else {
		errors.healthScore = 'Type a Health Score';
	}
	if (value.summary) {
		errors.summary = '';
	} else {
		errors.summary = 'Type a Summary or Description';
	}
    if(/^(ftp|http|https):\/\/[^ "]+$/.test(value.image)){
        errors.image = '';
    }else{
		errors.image = 'Must have a valid link image.'
	}
	if (value.analyzedInstructions) {
		errors.analyzedInstructions = '';
	} else {
		errors.analyzedInstructions = 'Type Instructions';
	}
	return errors;
}

export default validate;