var $win = $(window),
    $doc = $(document),
    heightSyncArray = [],
    syncGroup,
    rowEqualiserImgTimeout;

syncGroup = function($group) {
    var total = $group.length;
    if(!total) return;

    var currentOffset = -9999,
        rows = [],
        row = [],
        maxHeights = [],
        maxHeight;

    $group.each(function(index) {
        var targetOffset = $(this).offset().left;

        if(targetOffset > currentOffset) {
            row.push(this);
        } else {
            rows.push(row);
            row = [this];
        }

        if(index >= total-1) {
            rows.push(row);
        } else {
            currentOffset = targetOffset;
        }
    });

    $.each(rows, function(arrayIndex, rowArr) {
        maxHeight = [];

        $(rowArr)
            .css('height', '')
            .each(function() {
                maxHeight.push($(this).outerHeight());
            });

        maxHeights[arrayIndex] = maxHeight.slice(0);
    });

    $.each(maxHeights, function(arrayIndex, maxHeightArr) {
        if(maxHeightArr.length > 1) {
            $(rows[arrayIndex]).css(
                'height',
                Math.max.apply(null, maxHeightArr)
            );
        }
    });
};

$('[data-row-equaliser]').each(function() {
    var $instance = $(this),
        targets = $instance.data('row-equaliser');

    if(typeof targets !== 'string') {
        return;
    }

    var splitTargets = targets.split(',').map(function(arrVal) {
        return arrVal.trim();
    });

    heightSyncArray.push({
        context: $instance,
        selectors: splitTargets
    });

    var throttledSyncGroup = makeThrottledFn(function() {
        for(var i = 0; i < splitTargets.length; i++) {
            syncGroup($instance.find(splitTargets[i]));
        }
    });

    $instance.find('img').each(function() {
        if(!this.complete) {
            $(this).on('load', throttledSyncGroup);
        }
    });
});

if(heightSyncArray.length) {
    $win
        .on('resize.rowEqualiser', makeThrottledFn(function() {
            var i, j;

            for(i = 0; i < heightSyncArray.length; i++) {
                for(j = 0; j < heightSyncArray[i].selectors.length; j++) {
                    syncGroup(
                        heightSyncArray[i].context.find(
                            heightSyncArray[i].selectors[j]
                        )
                    );
                }
            }
        }))
        .triggerHandler('resize.rowEqualiser');

    if(document.readyState !== 'complete') {
        $doc.on('readystatechange.rowEqualiser', function() {
            if(document.readyState === 'complete') {
                $win.triggerHandler('resize.rowEqualiser');
                $doc.off('readystatechange.rowEqualiser');
            }
        });
    }
}