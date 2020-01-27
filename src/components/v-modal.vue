<template>
	<div>
		<div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
					<div class="modal-footer">
						<slot name="footer"></slot>
					</div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
	export default {
		name: "v-modal"
	}
</script>