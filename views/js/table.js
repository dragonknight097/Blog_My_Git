$('#wizard').bootstrapWizard({onNext: function(tab, navigation, index) {
    $valid = true;
    $newUser = $('#newUser').data('bootstrapValidator'); //the validator
    $wizard = $('#wizard').data('bootstrapWizard'); //the wizard

    $tab = $('#wizard').find('.tab-content').children().eq($wizard.currentIndex())
    $tab.find('input:text, input:password, input:file, select, textarea, input:not([type=hidden])')
        .each(function() {
            if ($newUser.options.fields[$(this).attr('name')]) {
            $newUser.validateField($(this).attr('name'));
            if ($(this).closest('.form-group').hasClass('has-error')){
                $valid = false;
                }
            }
        });
    return $valid ;
    }
})