<div class="modal fade" id="cancel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content ">
            <div class="modal-header " >
                <span class="icon"><i class="fa fa-exclamation-triangle"></i></span>
                <p class="modal-title ml-2" id="myModalLabel">Are you sure? </p>
                <button type="button" class="close " data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>                 
            </div>
        <div >          
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary yes" data-dismiss="modal">{{__('sentence.no')}}</button>
            <a  href="/employees/{{$data['employee']->id}}/"
                class="btn btn-primary cancel">{{ __('sentence.yes')}}</a>
            </div>
            </div>
        </div>
    </div>
</div>