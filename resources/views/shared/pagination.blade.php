<nav>
    <ul class="pagination">
        <li class="page-item {{ $paginator->previousPageUrl() ? :'disabled'}}">
            <a class="page-link" href="{{ $paginator->previousPageUrl() }}">{{__('sentence.previous')}}</a>
        </li>

        {{-- Pagination Elements --}}
        @foreach ($elements as $element)
        {{-- "Three Dots" Separator --}}
        @if(is_string($element))
        <li class="page-item disabled" aria-disabled="true"><span class="page-link">{{ $element }}</span></li>
        @endif
        {{-- Array Of Links --}}
        @if (is_array($element))
        @foreach ($element as $page => $url)
        @if ($page == $paginator->currentPage())
        <li class="page-item active" aria-current="page"><span class="page-link">{{ $page }}</span></li>
        @else
        <li class="page-item"><a class="page-link" href="{{ $url }}">
                {{ $page }}
            </a></li>
        @endif
        @endforeach
        @endif
        @endforeach

        <li class="page-item {{ $paginator->nextPageUrl() ? :'disabled'}}">
            <a class="page-link" href="{{ $paginator->nextPageUrl() }}">{{__('sentence.next')}}</a>
        </li>
    </ul>
</nav>
