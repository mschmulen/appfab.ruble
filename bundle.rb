require 'ruble'

bundle do |bundle|
  bundle.display_name = 'APPFAB'
  bundle.name = "Application Fabricator for Titanium"
  bundle.author = "Matt Schmulen"
  bundle.repository = "git://github.com/mschmulen/appfab.ruble.git"
    
    bundle.menu "Titanium APPFAB" do | fabricator_menu|
      fabricator_menu.scope = [ "app.js", "*.js"]
      
      fabricator_menu.menu "Insert factory" do | goto_menu |
        goto_menu.command "insert YACK"
        goto_menu.seperator
        goto_menu.command "insert FOO"
        goto_menu.seperator
      end
    end
end


# ********************************************************
# Snippets: 
# ********************************************************

# execute a shell command
#snippet "My shell Snippet" do |s|
#  s.trigger = "foo"
#  s.expansion = "${1:method_name}: function(${2:attribute}){}"
#end

# API Snippets for functional enclosures 
snippet "function" do |s|
  s.trigger = "API."
  s.scope = "*.js"
  s.expansion = "$1 = function(opts){ \n\n };"
end

# ********************************************************
# File templates: Titanium Mobile Javascript Templates
# ********************************************************

template "factory uiChess" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiChess.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

template "factory uiSplash" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiSplash.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

template "factory uiMap" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiMap.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

template "factory uiTable" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiTable.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

template "factory uiTwitter" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiTwitterTable.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

template "factory uiVideoTable" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryUI/uiVideoTable.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

# MODEL TEMPLATES
# template "factory modelTwitter" do |t|
#   t.filetype = "*.js"
#   t.invoke do |context|
#     ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
#     raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModel/modelTwitter.js")
#     raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
#   end
# end

template "factory modelSQLITE" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModel/modelSQLITE.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end


#### MODULES
template "factory uiCharts" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiCharts.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

template "factory uiGameKit" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiGameKit.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

template "factory Gears" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiGears.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

template "factory uiOpengl" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiOpengl.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

template "factory uiPaint" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiPaint.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

template "factory uiQuickLook" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiQuickLook.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end

template "factory uiStacker" do |t|
  t.filetype = "*.js"
  t.invoke do |context|
    ENV['TM_DATE'] = Time.now.strftime("%Y-%m-%d")
    raw_contents = IO.read("#{File.dirname(ENV['TM_BUNDLE_SUPPORT'])}/factoryModules/uiStacker.js")
    raw_contents.gsub(/\$\{([Creating a new template^}]*)\}/) {|match| ENV[match[2..-2]] }
  end
end


# ********************************************************
# Project templates: Titanium Mobile Project Templates
# ********************************************************

project_template "appFab Template.ACSAppStore" do |t|
  t.type = :titanium_mobile
  t.location = "git://github.com/mschmulen/Template.ACSAppStore.git"
  t.description = " ACS App store template "
  t.icon = "http://preview.appcelerator.com/dashboard/img/icons/icon_geo.png"
end

project_template "appFab Template.CustomerBilling" do |t|
  t.type = :titanium_mobile
  t.location = "git://github.com/mschmulen/Tempate.CustomerBilling.git"
  t.description = " Customer Billing template "
  t.icon = "http://preview.appcelerator.com/dashboard/img/icons/icon_geo.png"
end

project_template "appFab Template.EnterpriseApproval" do |t|
  t.type = :titanium_mobile
  t.location = "git://github.com/mschmulen/Tempate.EnterpriseApproval.git"
  t.description = " PO Approval template "
  t.icon = "http://preview.appcelerator.com/dashboard/img/icons/icon_geo.png"
end


#project_template "Tab fab local" do |t|
#  t.type = :titanium_mobile
#  t.location = "templates/tabFab.zip"
#  t.description = "Tab Factory "
#end





