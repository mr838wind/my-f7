<template>
  <f7-page>
    <f7-navbar large title="Data Table Sample"  back-link="Back"></f7-navbar>
    <!-- 
    <f7-block-title>Data Table Sample</f7-block-title>
    -->
    
    <f7-block strong>
      <p>test data table</p>
    </f7-block>
    
    <!-- data table -->
    <div class="card data-table">
      <table>
        <thead>
          <tr>
            <th class="label-cell">Desert (100g serving)</th>
            <th class="numeric-cell">Calories</th>
            <th class="numeric-cell">Fat (g)</th>
            <th class="numeric-cell">Carbs</th>
            <th class="numeric-cell">Protein (g)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label-cell">Frozen yogurt</td>
            <td class="numeric-cell">159</td>
            <td class="numeric-cell">6.0</td>
            <td class="numeric-cell">24</td>
            <td class="numeric-cell">4.0</td>
          </tr>
          ...
        </tbody>
      </table>
      <div class="data-table-footer">
        <div class="data-table-rows-select">
          Per page:
          <div class="input input-dropdown">
            <select>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>
        <div class="data-table-pagination">
          <span class="data-table-pagination-label">1-5 of 10</span>
          <a href="#" class="link disabled">
            <i class="icon icon-prev color-gray"></i>
          </a>
          <a href="#" class="link">
            <i class="icon icon-next color-gray"></i>
          </a>
        </div>
      </div>
    </div>
    <!-- //data table -->

  </f7-page>
</template>
<script>
export default {
  components: {}
};
</script>