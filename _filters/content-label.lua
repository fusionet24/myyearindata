-- content-label.lua
-- Adds a clickable content label badge to the title block metadata section

local labelClasses = {
  ["AI Generated"] = "content-label-ai-generated",
  ["AI Assisted"] = "content-label-ai-assisted",
  ["AI Reviewed"] = "content-label-ai-reviewed",
  ["No AI"] = "content-label-no-ai"
}

function Pandoc(doc)
  local label = doc.meta["ai-label"]
  if label then
    local labelText = pandoc.utils.stringify(label)
    local labelClass = labelClasses[labelText] or "content-label-no-ai"

    -- Create JavaScript that will inject the badge into the title block
    local script = string.format([[
<script>
document.addEventListener('DOMContentLoaded', function() {
  var titleMeta = document.querySelector('.quarto-title-meta');
  if (titleMeta) {
    var labelDiv = document.createElement('div');
    labelDiv.innerHTML = '<div class="quarto-title-meta-heading">Content Label</div><div class="quarto-title-meta-contents"><a href="/posts/AI-Content-Labels/" class="content-label-badge %s">%s</a></div>';
    titleMeta.appendChild(labelDiv);
  }
});
</script>
]], labelClass, labelText)

    -- Append the script to the document body
    local scriptBlock = pandoc.RawBlock("html", script)
    table.insert(doc.blocks, scriptBlock)
  end

  return doc
end
