(function () {
    const SUDOKU = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    let prefix = 'sh_';
    let parent_id = prefix + 'parent';
    let result_id = prefix + 'result';
    let numbers_id = prefix + 'numbers';
    let target_id = prefix + 'target';
    let exclude_id = prefix + 'exclude';
    let size_id = prefix + 'size';

    function createLabel(target){

    }

    function renderHelper() {
        let parent_element = document.createElement('div');
        parent_element.id = parent_id;
        parent_element.style.cssText = 'position: absolute;width: 100%;height: 100%;z-index: 100;top: 0px;left: 0px;min-width: 100px;min-height: 100px;';

        let ul_el = document.createElement('ul');
        ul_el.style.cssText='list-style-type:none;'



        document.body.appendChild(parent_element);
    }
    renderHelper();


    function copy(a) {
        copyItems = [];
        a.forEach(el => copyItems.push(el));
        return copyItems;
    }

    function total(a) {
        let result = 0;
        a.forEach(el => result += el);
        return result;
    }

    function printResults(results) {
        let resultEl = document.getElementById('result');
        let out = '';
        results.forEach(result => {
            out += result.join(' ') + '\n';
        });
        resultEl.innerText = out;

        let numbersEl = document.getElementById('numbers');
        let nums = [];
        results.forEach(result => {
            result.forEach(el => {
                if (!nums.includes(el)) {
                    nums.push(el);
                }
            })
        });
        nums.sort(function (a, b) {
            return a - b;
        });
        numbersEl.innerText = nums.join(' ');
    }

    function keepLooking(currentValue, target, candidates, startIndex, tmpResult, size, results) {
        let currentSize = tmpResult.length;
        let remainingCount = size - currentSize;
        candidates.forEach(function (el, i) {
            if (i >= startIndex) {
                if (remainingCount == 1) {
                    if ((currentValue + el) == target) {
                        let localCopy = copy(tmpResult);
                        localCopy.push(el);
                        results.push(localCopy);
                    }
                } else if (remainingCount > 1) {
                    if ((currentValue + el) < target) {
                        let localCopy = copy(tmpResult);
                        localCopy.push(el);
                        keepLooking(total(localCopy), target, candidates, i + 1, localCopy, size, results);
                    }
                }
            }
        });
    }

    function findCandidates() {
        let target = document.getElementById('target').value;
        let exclude = document.getElementById('exclude').value.trim().split('');
        let size = document.getElementById('size').value;

        let candidates = SUDOKU.filter(el => !exclude.includes(el.toString()))

        let results = [];

        candidates.forEach(function (num, i) {
            let r = [num];
            if (total(r) < target) {
                keepLooking(total(r), target, candidates, i + 1, r, size, results);
            }
        });
        printResults(results);
    }

});