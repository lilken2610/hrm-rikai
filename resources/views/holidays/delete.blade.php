<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content ">
            <div class="modal-header " >
                <span class="icon"><i class="fa fa-exclamation-triangle"></i></span>
                <p class="modal-title ml-2" id="myModalLabel">Are you sure delete this holidays? </p>
                <button type="button" class="close " data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>                 
            </div>
        <form action="{{route('holidays.destroy',$holiday->id)}}" method="post" >
        @csrf 
        @method('DELETE')
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{__('sentence.cancel')}}</button>
            <button type="submit" class="btn btn-primary" name="delete_dividend" >{{__('sentence.delete')}}</button>
            </div>
            </form>
        </div>
    </div>
</div>

<script>
    $(document).ready(function (e) {
        $(document).on("click", ".delete", function (e) {
            var delete_id = $(this).attr('data-value');
            $('button[name="delete_dividend"]').val(delete_id);
            console.log(delete_id);
        });
    });
  
</script>