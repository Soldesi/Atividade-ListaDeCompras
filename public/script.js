const API = '/api/items';

// ── Utilitários ──────────────────────────────────────────────────────────────

const fmt = (v) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

const emojis = ['🛒'];
const emoji = (name) => emojis[name.charCodeAt(0) % emojis.length];

function escHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `show ${type}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = ''; }, 3000);
}

// ── Renderizar lista ─────────────────────────────────────────────────────────

function renderItems(items) {
  const el       = document.getElementById('items-list');
  const countEl  = document.getElementById('item-count');
  const totalBar = document.getElementById('total-bar');
  const totalEl  = document.getElementById('total-value');

  countEl.textContent = `${items.length} ${items.length === 1 ? 'item' : 'itens'}`;

  if (!items.length) {
    el.innerHTML = `
      <div class="empty-state">
        <div class="icon">🛒</div>
        <p>Nenhum produto na lista ainda.<br/>Adicione o primeiro acima!</p>
      </div>`;
    totalBar.style.display = 'none';
    return;
  }

  el.innerHTML = items.map(item => `
    <div class="item-card" id="card-${item._id}">
      <div class="item-info">
        <div class="item-icon">${emoji(item.name)}</div>
        <div>
          <div class="item-name">${escHtml(item.name)}</div>
          <div class="item-price">${fmt(item.price)}</div>
        </div>
      </div>
      <div class="item-actions">
        <button class="btn btn-edit"
          onclick="openEditModal('${item._id}','${escHtml(item.name)}',${item.price})">
          Editar
        </button>
        <button class="btn btn-delete" onclick="deleteItem('${item._id}')">
          Excluir
        </button>
      </div>
    </div>
  `).join('');

  const total = items.reduce((s, i) => s + i.price, 0);
  totalEl.textContent = fmt(total);
  totalBar.style.display = 'flex';
}

// ── Buscar todos os itens ────────────────────────────────────────────────────

async function fetchItems() {
  try {
    const res  = await fetch(API);
    const json = await res.json();
    renderItems(json.data || []);
  } catch {
    showToast('Erro ao conectar com o servidor', 'error');
  }
}

// ── Adicionar item ───────────────────────────────────────────────────────────

async function addItem() {
  const name  = document.getElementById('input-name').value.trim();
  const price = parseFloat(document.getElementById('input-price').value);

  if (!name)               { showToast('Informe o nome do produto', 'error'); return; }
  if (isNaN(price) || price < 0) { showToast('Informe um valor válido', 'error'); return; }

  try {
    const res  = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    });
    const json = await res.json();

    if (json.success) {
      document.getElementById('input-name').value  = '';
      document.getElementById('input-price').value = '';
      showToast(`"${name}" adicionado com sucesso! 🎉`);
      fetchItems();
    } else {
      showToast(json.message || 'Erro ao adicionar', 'error');
    }
  } catch {
    showToast('Erro de conexão', 'error');
  }
}

// ── Editar item ──────────────────────────────────────────────────────────────

function openEditModal(id, name, price) {
  document.getElementById('edit-id').value    = id;
  document.getElementById('edit-name').value  = name;
  document.getElementById('edit-price').value = price;
  document.getElementById('modal-overlay').classList.add('active');
  setTimeout(() => document.getElementById('edit-name').focus(), 50);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
}

async function saveEdit() {
  const id    = document.getElementById('edit-id').value;
  const name  = document.getElementById('edit-name').value.trim();
  const price = parseFloat(document.getElementById('edit-price').value);

  if (!name)               { showToast('Informe o nome', 'error'); return; }
  if (isNaN(price) || price < 0) { showToast('Valor inválido', 'error'); return; }

  try {
    const res  = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    });
    const json = await res.json();

    if (json.success) {
      closeModal();
      showToast('Produto atualizado! ✅');
      fetchItems();
    } else {
      showToast(json.message || 'Erro ao atualizar', 'error');
    }
  } catch {
    showToast('Erro de conexão', 'error');
  }
}

// ── Excluir item ─────────────────────────────────────────────────────────────

async function deleteItem(id) {
  if (!confirm('Deseja realmente excluir este produto?')) return;

  try {
    const res  = await fetch(`${API}/${id}`, { method: 'DELETE' });
    const json = await res.json();

    if (json.success) {
      showToast('Produto excluído');
      fetchItems();
    } else {
      showToast(json.message || 'Erro ao excluir', 'error');
    }
  } catch {
    showToast('Erro de conexão', 'error');
  }
}

// ── Atalhos de teclado ───────────────────────────────────────────────────────

document.getElementById('input-name').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('input-price').focus();
});

document.getElementById('input-price').addEventListener('keydown', e => {
  if (e.key === 'Enter') addItem();
});

document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

// ── Inicialização ────────────────────────────────────────────────────────────

fetchItems();
