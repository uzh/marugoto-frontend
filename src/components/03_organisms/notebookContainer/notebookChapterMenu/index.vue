<template src="./template.html"></template>

<script>
    import apiService from '@/apiService'
    import svgIcon from '@/components/01_atoms/svgicon';

    export default {
        name: 'NotebookChapterMenu',
        components: {svgIcon},
        props: ['currentEntry', 'list'],
        data() {
            return {
                basePath: process.env.VUE_APP_BASE_PATH,
                resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
                disabled: false,
                disabledDirection: false,
            };
        },
        methods: {
            downloadZip: function () {
                apiService.get(`${this.basePath}api/notebook/pdf/current`, {
                    responseType: 'blob'
                })
                    .then(resp => {
                        const url = window.URL.createObjectURL(new Blob([resp.data]));
                        const link = document.createElement('a');
                        const contentDisposition = resp.headers['content-disposition'];

                        let fileName = 'marugoto-notebook.pdf';
                        if (contentDisposition) {
                            const fileNameMatch = contentDisposition.match(/filename=(.+)/);
                            if (fileNameMatch.length === 2)
                                fileName = fileNameMatch[1];
                        }
                        link.href = url;
                        link.setAttribute('download', fileName);
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch(err => {
                        throw(err);
                    });
            },
            emitChange: function (direction) {
                if (this.disabled) {
                    return;
                }
                /**
                 * Directions
                 * Next, Prev, First Last
                 */
                if (this.currentEntry < this.list.length - 1 && direction == 'next') {
                    // Next
                    this.$emit('changeCurrentEntryTo', 'next');
                } else if (this.currentEntry != 0 && direction == 'prev') {
                    // Prev
                    this.$emit('changeCurrentEntryTo', 'prev');
                } else if (direction == 'last') {
                    // Last
                    this.$emit('changeCurrentEntryTo', 'last');
                } else if (direction == 'first') {
                    this.$emit('changeCurrentEntryTo', 'first');
                }
                this.disabled = true;
                var self = this;
                setTimeout(function () {
                    self.disabled = false;
                }, 600);

            },
        },
    }
</script>
