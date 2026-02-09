-- defn.lua
-- Shortcode for definition links with tooltips
-- Usage: {{< defn "Context Rot" >}}

local definitions = nil

local function load_definitions()
  if definitions ~= nil then
    return definitions
  end

  -- Resolve path relative to this script file
  local script_dir = PANDOC_SCRIPT_FILE:match("(.*[/\\])")
  local path = script_dir and (script_dir .. "definitions.json") or "definitions.json"

  local file = io.open(path, "r")
  if not file then
    io.stderr:write("WARNING [defn]: Could not open " .. path .. "\n")
    definitions = {}
    return definitions
  end

  local content = file:read("*all")
  file:close()

  local ok, result = pcall(quarto.json.decode, content)
  if not ok then
    io.stderr:write("WARNING [defn]: Failed to parse definitions.json: " .. tostring(result) .. "\n")
    definitions = {}
    return definitions
  end

  definitions = result
  return definitions
end

local function normalize_key(term)
  return term:lower():gsub("%s+", "-")
end

local function escape_html(str)
  return str:gsub("&", "&amp;")
            :gsub("<", "&lt;")
            :gsub(">", "&gt;")
            :gsub('"', "&quot;")
            :gsub("'", "&#39;")
end

return {
  ["defn"] = function(args, kwargs)
    if #args == 0 then
      io.stderr:write("WARNING [defn]: No term provided\n")
      return pandoc.RawInline("html", '<span class="defn-missing">[defn: no term]</span>')
    end

    local term = pandoc.utils.stringify(args[1])
    local key = normalize_key(term)
    local defs = load_definitions()
    local entry = defs[key]

    if entry == nil then
      io.stderr:write("WARNING [defn]: Definition not found for '" .. term .. "' (key: " .. key .. ")\n")
      return pandoc.RawInline("html",
        '<span class="defn-missing" title="Definition not found: ' .. escape_html(term) .. '">' ..
        escape_html(term) .. '</span>'
      )
    end

    local display = entry.display or term
    local summary = entry.summary or ""
    local url = entry.url or "#"

    return pandoc.RawInline("html", string.format(
      '<a href="%s" class="defn-link" data-tooltip="%s">%s</a>',
      escape_html(url),
      escape_html(summary),
      escape_html(display)
    ))
  end
}
