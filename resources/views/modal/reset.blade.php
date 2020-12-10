<div class="modal fade" id="reset" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content ">
            <div class="modal-header " >
                <span class="icon"><i class="fa fa-exclamation-triangle"></i></span>
                <p class="modal-title ml-2" id="myModalLabel">Are you sure ? </p>
                <button type="button" class="close " data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>                 
            </div>
        <div >
           
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">{{__('sentence.no')}}</button>
                <button type="reset" class="btn btn-primary " name="reset_dividend" value="foo">{{__('sentence.yes')}}</button>
            </div>
            </div>
        </div>
    </div>
</div>